import { Controller } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FormElementInterface } from '@/interfaces';

export default function FormElement({
  control,
  variant,
  name,
  label,
  options,
}: FormElementInterface) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            {variant === 'text' ? (
              <Input
                type="text"
                id={name}
                aria-invalid={fieldState.invalid}
                {...field}
              />
            ) : null}
            {variant === 'number' ? (
              <Input
                type="number"
                id={name}
                aria-invalid={fieldState.invalid}
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            ) : null}
            {variant === 'select' && options ? (
              <Select
                aria-invalid={fieldState.invalid}
                onValueChange={(value) => field.onChange(value)} // or convert value as needed
                value={String(field.value)}
              >
                <SelectTrigger
                  id={name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  className="w-[180px]"
                >
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  {options?.map(({ label, value }, i) => (
                    <SelectItem key={i} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </>
        )}
      />
    </Field>
  );
}
