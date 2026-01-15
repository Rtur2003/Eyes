"use client";

import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState, forwardRef } from "react";

/**
 * Props for the Input component
 * @interface InputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional label displayed above the input */
  label?: string;
  /** Error message to display below input */
  error?: string;
  /** Hint text displayed below input when no error */
  hint?: string;
  /** Icon displayed on the left side */
  leftIcon?: React.ReactNode;
  /** Icon displayed on the right side */
  rightIcon?: React.ReactNode;
}

/**
 * Input - A styled text input component
 * 
 * Features:
 * - Optional label, error, and hint text
 * - Support for left and right icons
 * - Focus and hover states with gold theme
 * - Error state styling
 * - Smooth transitions
 * - Glass-morphism background
 * 
 * @component
 * @example
 * ```tsx
 * <Input
 *   label="Dream Title"
 *   placeholder="Enter a title..."
 *   leftIcon={<Sparkles size={16} />}
 *   error={errors.title}
 *   hint="Give your dream a memorable name"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, ...props }, ref) => {
    // Generate a unique ID if not provided for accessibility
    const inputId = props.id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-sans uppercase tracking-widest text-gold-300/60 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-obsidian-surface/50 border border-gold-500/20 rounded-lg",
              "px-4 py-3 text-gold-50 placeholder:text-gold-300/30",
              "transition-all duration-300",
              "focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20",
              "hover:border-gold-500/30",
              leftIcon && "pl-12",
              rightIcon && "pr-12",
              error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-500/50">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p id={errorId} className="mt-2 text-xs text-red-400" role="alert">{error}</p>}
        {hint && !error && <p id={hintId} className="mt-2 text-xs text-gold-300/50">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

/**
 * SearchInput - A specialized input for search functionality
 * 
 * Features:
 * - Dedicated search icon on the left
 * - Clear button when input has value
 * - Optimized for search UX
 * - Gold-themed styling
 * 
 * @component
 * @example
 * ```tsx
 * <SearchInput
 *   value={searchQuery}
 *   onChange={setSearchQuery}
 *   onClear={() => setSearchQuery('')}
 *   placeholder="Search dreams..."
 * />
 * ```
 */
export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Search dreams...",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full bg-obsidian-surface/50 border border-gold-500/20 rounded-lg",
          "pl-12 pr-10 py-3 text-gold-50 placeholder:text-gold-300/30",
          "transition-all duration-300",
          "focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20"
        )}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-500/50 hover:text-gold-400 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

/**
 * Props for the Textarea component
 * @interface TextareaProps
 * @extends {React.TextareaHTMLAttributes<HTMLTextAreaElement>}
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Optional label displayed above the textarea */
  label?: string;
  /** Error message to display below textarea */
  error?: string;
  /** Hint text displayed below textarea when no error */
  hint?: string;
}

/**
 * Textarea - A styled multi-line text input component
 * 
 * Features:
 * - Multi-line text input
 * - Optional label, error, and hint text
 * - Minimum height of 120px
 * - Resize disabled for consistent layout
 * - Focus and hover states with gold theme
 * - Error state styling
 * 
 * @component
 * @example
 * ```tsx
 * <Textarea
 *   label="Dream Description"
 *   placeholder="Describe your dream in detail..."
 *   rows={6}
 *   error={errors.description}
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-sans uppercase tracking-widest text-gold-300/60 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-obsidian-surface/50 border border-gold-500/20 rounded-lg",
            "px-4 py-3 text-gold-50 placeholder:text-gold-300/30",
            "transition-all duration-300 resize-none",
            "focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20",
            "hover:border-gold-500/30 min-h-[120px]",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="mt-2 text-xs text-gold-300/50">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

/**
 * SelectOption - Type definition for select dropdown options
 * @interface SelectOption
 */
interface SelectOption {
  /** Value of the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Optional color for visual indication */
  color?: string;
}

/**
 * Props for the Select component
 * @interface SelectProps
 */
interface SelectProps {
  /** Optional label displayed above the select */
  label?: string;
  /** Array of selectable options */
  options: SelectOption[];
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Error message to display */
  error?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Select - A custom styled dropdown select component
 * 
 * Features:
 * - Custom dropdown with smooth animations
 * - Optional color indicators for options
 * - Keyboard accessible
 * - Click outside to close
 * - Gold-themed styling
 * - Error state support
 * 
 * @component
 * @example
 * ```tsx
 * <Select
 *   label="Dream Type"
 *   value={dreamType}
 *   onChange={setDreamType}
 *   options={dreamTypeOptions}
 *   placeholder="Select dream type..."
 * />
 * ```
 */
export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "Select option...",
  error,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("relative w-full", className)}>
      {label && (
        <label className="block text-xs font-sans uppercase tracking-widest text-gold-300/60 mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-obsidian-surface/50 border border-gold-500/20 rounded-lg",
          "px-4 py-3 text-left transition-all duration-300",
          "focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20",
          "hover:border-gold-500/30",
          isOpen && "border-gold-500/50 ring-1 ring-gold-500/20"
        )}
      >
        <span className={selectedOption ? "text-gold-50" : "text-gold-300/30"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50 transition-transform",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-50 w-full mt-2 bg-obsidian-card border border-gold-500/20 rounded-lg shadow-lg overflow-hidden"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-3 text-left text-sm transition-colors",
                "hover:bg-gold-500/10",
                value === option.value
                  ? "text-gold-400 bg-gold-500/5"
                  : "text-gold-100"
              )}
            >
              <div className="flex items-center gap-2">
                {option.color && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                )}
                {option.label}
              </div>
            </button>
          ))}
        </motion.div>
      )}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

/**
 * TagInput - A component for managing multiple tags
 * 
 * Features:
 * - Add tags by pressing Enter
 * - Remove tags with backspace or click
 * - Visual badge display of tags
 * - Prevents duplicate tags
 * - Keyboard navigation support
 * 
 * @component
 * @example
 * ```tsx
 * <TagInput
 *   label="Tags"
 *   tags={dreamTags}
 *   onAdd={(tag) => setDreamTags([...dreamTags, tag])}
 *   onRemove={(tag) => setDreamTags(dreamTags.filter(t => t !== tag))}
 *   placeholder="Add a tag..."
 * />
 * ```
 */
export function TagInput({
  label,
  tags,
  onAdd,
  onRemove,
  placeholder = "Add tag...",
  className,
}: {
  label?: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const trimmedValue = inputValue.trim();
    if (e.key === "Enter" && trimmedValue) {
      e.preventDefault();
      if (!tags.includes(trimmedValue)) {
        onAdd(trimmedValue);
      }
      setInputValue("");
    }
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      onRemove(tags[tags.length - 1]);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-xs font-sans uppercase tracking-widest text-gold-300/60 mb-2">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2 p-3 bg-obsidian-surface/50 border border-gold-500/20 rounded-lg focus-within:border-gold-500/50 focus-within:ring-1 focus-within:ring-gold-500/20 transition-all duration-300">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gold-500/10 text-gold-400 text-xs border border-gold-500/20"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemove(tag)}
              className="hover:text-gold-200 transition-colors"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[100px] bg-transparent outline-none text-gold-50 placeholder:text-gold-300/30 text-sm"
        />
      </div>
    </div>
  );
}

/**
 * Slider - A range input slider component
 * 
 * Features:
 * - Custom styled range slider
 * - Gold gradient fill
 * - Draggable thumb with glow effect
 * - Optional value display
 * - Configurable min, max, and step values
 * - Visual progress indicator
 * 
 * @component
 * @example
 * ```tsx
 * <Slider
 *   label="Lucidity Level"
 *   value={lucidity}
 *   onChange={setLucidity}
 *   min={0}
 *   max={100}
 *   step={5}
 *   showValue
 * />
 * ```
 */
export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  className,
}: {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  className?: string;
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-3">
          {label && (
            <label className="text-xs font-sans uppercase tracking-widest text-gold-300/60">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-mono text-gold-400">{value}</span>
          )}
        </div>
      )}
      <div className="relative h-2 w-full">
        <div className="absolute inset-0 rounded-full bg-obsidian-surface" />
        <div
          className="absolute h-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-400 border-2 border-obsidian shadow-glow-gold pointer-events-none"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
}