import clsx from "clsx"
import React, { Children } from "react"
import Spinner from "../../atoms/spinner"

type ButtonProps = {
  variant: "primary" | "secondary" | "ghost" | "danger"
  size: "small" | "medium" | "large"
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "large",
      loading = false,
      children,
      ...attributes
    },
    ref
  ) => {
    const handleClick = e => {
      if (!loading && attributes.onClick) {
        attributes.onClick(e)
      }
    }

    const variantClassname = clsx({
      ["btn-primary"]: variant === "primary",
      ["btn-secondary"]: variant === "secondary",
      ["btn-ghost"]: variant === "ghost",
      ["btn-danger"]: variant === "danger",
    })

    const sizeClassname = clsx({
      ["btn-large"]: size === "large",
      ["btn-medium"]: size === "medium",
      ["btn-small"]: size === "small",
    })

    return (
      <button
        {...attributes}
        className={clsx(
          "btn w-32",
          variantClassname,
          sizeClassname,
          attributes.className
        )}
        disabled={attributes.disabled || loading}
        ref={ref}
        onClick={handleClick}
      >
        {loading ? (
          <Spinner size={size} variant={"secondary"} />
        ) : (
          Children.map(children, (child, i) => {
            return (
              <span key={i} className="mr-xsmall last:mr-0">
                {child}
              </span>
            )
          })
        )}
      </button>
    )
  }
)

export default Button