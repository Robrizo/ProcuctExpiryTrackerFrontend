import { useState } from "react";
import { useNavigate } from "react-router";
import { productSchema } from "../schemas/productSchema";

const COMMON_CATEGORIES = [
  "Dairy",
  "Produce",
  "Meat & Poultry",
  "Bakery",
  "Frozen",
  "Beverages",
  "Medicine",
  "Pantry",
  "Household",
];

const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const ProductForm = ({
  initialValues,
  onSubmit,
  submitLabel = "Save Product",
  isEdit = false,
}) => {
  const navigate = useNavigate();

  const todayStr = getTodayDate();

  const [name, setName] = useState(initialValues?.name ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [quantity, setQuantity] = useState(initialValues?.quantity ?? 1);
  const [purchaseDate, setPurchaseDate] = useState(
    initialValues?.purchase_date ?? todayStr,
  );
  const [expiryDate, setExpiryDate] = useState(
    initialValues?.expiry_date ?? "",
  );
  const [notes, setNotes] = useState(initialValues?.notes ?? "");

  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setFieldErrors({});

    const payload = {
      name: name.trim(),
      category: category.trim() || "General",
      quantity: Number(quantity),
      purchase_date: purchaseDate,
      expiry_date: expiryDate,
      notes: notes.trim() || "",
    };

    // validate payload
    const result = productSchema.safeParse(payload);

    if (!result.success) {
      const errors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (field && !errors[field]) {
          errors[field] = issue.message;
        }
      }

      setFieldErrors(errors);
      setError(
        result.error.issues[0]?.message || "Please fix the errors below.",
      );
      return;
    }

    const data = {
      name: result.data.name.trim(),
      category: result.data.category?.trim() || "General",
      quantity: Number(result.data.quantity),
      purchase_date: result.data.purchase_date,
      expiry_date: result.data.expiry_date,
      notes: result.data.notes ?? "",
    };

    setIsSubmitting(true);

    try {
      await onSubmit(data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Product submission failed:", err.response?.data ?? err);

      const detail = err.response?.data?.detail;

      // Handle FastAPI's Pydantic validation response.
      if (Array.isArray(detail)) {
        const errors = {};

        detail.forEach((item) => {
          const field = item.loc?.slice(1).join(".");

          if (field && !errors[field]) {
            errors[field] = item.msg;
          }
        });

        setFieldErrors((prev) => ({
          ...prev,
          ...errors,
        }));

        setError(
          detail
            .map((item) => {
              const field = item.loc?.slice(1).join(".");
              return `${field ? `${field}: ` : ""}${item.msg}`;
            })
            .join("; "),
        );
      } else {
        setError(
          typeof detail === "string"
            ? detail
            : err.response?.data?.message ||
                err.message ||
                "Failed to save product. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-colors shadow-xs ${
      fieldErrors[field] ? "border-rose-400" : "border-slate-200"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* General error */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"
        >
          {error}
        </div>
      )}

      {/* Product Name */}
      <div>
        <label
          htmlFor="product-name-input"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Product Name <span className="text-rose-500">*</span>
        </label>

        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Whole Milk, Bread"
          className={inputClass("name")}
          required
          maxLength={150}
          aria-invalid={Boolean(fieldErrors.name)}
        />

        {fieldErrors.name && (
          <p className="mt-1 text-xs text-rose-600">{fieldErrors.name}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="product-category-input"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Category
        </label>

        <div className="space-y-2">
          <input
            name="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category or pick below"
            className={inputClass("category")}
            maxLength={80}
            aria-invalid={Boolean(fieldErrors.category)}
          />

          {fieldErrors.category && (
            <p className="text-xs text-rose-600">{fieldErrors.category}</p>
          )}

          <div className="flex flex-wrap gap-1.5">
            {COMMON_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded-md border transition-colors cursor-pointer ${
                  category.toLowerCase() === cat.toLowerCase()
                    ? "bg-slate-900 text-white border-slate-900 font-medium"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quantity and dates */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Quantity */}
        <div>
          <label
            htmlFor="product-quantity-input"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Quantity <span className="text-rose-500">*</span>
          </label>

          <input
            name="quantity"
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value === "" ? "" : Number(e.target.value));
            }}
            onBlur={() => {
              if (quantity === "" || Number(quantity) < 1) {
                setQuantity(1);
              }
            }}
            className={inputClass("quantity")}
            required
            aria-invalid={Boolean(fieldErrors.quantity)}
          />

          {fieldErrors.quantity && (
            <p className="mt-1 text-xs text-rose-600">{fieldErrors.quantity}</p>
          )}
        </div>

        {/* Purchase Date */}
        <div>
          <label
            htmlFor="product-purchase-date-input"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Purchase Date <span className="text-rose-500">*</span>
          </label>

          <input
            name="purchase_date"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className={inputClass("purchase_date")}
            required
            aria-invalid={Boolean(fieldErrors.purchase_date)}
          />

          {fieldErrors.purchase_date && (
            <p className="mt-1 text-xs text-rose-600">
              {fieldErrors.purchase_date}
            </p>
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <label
            htmlFor="product-expiry-date-input"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Expiry Date <span className="text-rose-500">*</span>
          </label>

          <input
            name="expiry_date"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className={inputClass("expiry_date")}
            required
            aria-invalid={Boolean(fieldErrors.expiry_date)}
          />

          {fieldErrors.expiry_date && (
            <p className="mt-1 text-xs text-rose-600">
              {fieldErrors.expiry_date}
            </p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="product-notes-input"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Optional Notes
        </label>

        <textarea
          name="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Storage instructions (e.g., Keep refrigerated)"
          className={`${inputClass("notes")} resize-none`}
          aria-invalid={Boolean(fieldErrors.notes)}
        />

        {fieldErrors.notes && (
          <p className="mt-1 text-xs text-rose-600">{fieldErrors.notes}</p>
        )}
      </div>

      {/* Actions */}
      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
          className="px-4 py-2.5 border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            submitLabel || (isEdit ? "Update Product" : "Save Product")
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
