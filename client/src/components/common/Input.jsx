import React from 'react';

const Input = React.forwardRef(({
  label,
  error,
  helperText,
  type = 'text',
  className = '',
  containerClassName = '',
  labelClassName = '',
  ...props
}, ref) => {
  const inputClasses = [
    'block w-full rounded-md shadow-sm',
    'focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
    error
      ? 'border-red-300 text-red-900 placeholder-red-300'
      : 'border-gray-300',
    className
  ].join(' ');

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={props.id}
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 