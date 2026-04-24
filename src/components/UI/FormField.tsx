import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type FieldOption = {
  label: string;
  value: string;
};

type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  as?: "input" | "textarea" | "select";
  type?: HTMLInputTypeAttribute;
  rows?: number;
  options?: FieldOption[];
  readOnly?: boolean;
};

const CONTROL_CLASSNAME =
  "w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition-all duration-200 placeholder:text-slate-400";

export function FormField({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  autoComplete,
  className,
  as = "input",
  type = "text",
  rows = 3,
  options = [],
  readOnly = false,
}: FormFieldProps) {
  const fieldId = `field-${name}`;
  const hasError = Boolean(error);
  const stateClassName = hasError
    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
    : "border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <label htmlFor={fieldId} className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </span>

      {as === "textarea" ? (
        <textarea
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          aria-invalid={hasError}
          autoComplete={autoComplete}
          className={`${CONTROL_CLASSNAME} ${stateClassName}`}
          placeholder={placeholder || label}
          readOnly={readOnly}
        />
      ) : null}

      {as === "select" ? (
        <select
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={hasError}
          autoComplete={autoComplete}
          className={`${CONTROL_CLASSNAME} ${stateClassName}`}
          disabled={readOnly}
        >
          {options.map((option) => (
            <option key={`${name}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {as === "input" ? (
        <input
          id={fieldId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={hasError}
          autoComplete={autoComplete}
          className={`${CONTROL_CLASSNAME} ${stateClassName}`}
          placeholder={placeholder || label}
          readOnly={readOnly}
        />
      ) : null}

      {error ? <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p> : null}
    </label>
  );
}