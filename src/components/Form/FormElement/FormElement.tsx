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
import { Textarea } from '@/components/ui/textarea';
import type { FormElementInterface } from '@/types';
import { Slider } from '@/components/ui/slider';

export default function FormElement({
  control,
  variant,
  name,
  label,
  options,
}: FormElementInterface) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {variant !== 'slider' ? (
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
          ) : (
            <FieldLabel>
              {label}
              <span>({field.value})</span>
            </FieldLabel>
          )}

          {variant === 'text' ? (
            <Textarea
              rows={4}
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
          {variant === 'slider' ? (
            <Slider
              id={name}
              aria-labelledby={name}
              defaultValue={[typeof field.value === 'string' ? 0 : field.value]}
              onValueChange={(value) => field.onChange(value[0])}
              aria-invalid={fieldState.invalid}
              min={0}
              max={0.5}
              step={0.1}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          ) : null}
          {variant === 'select' && options ? (
            <Select
              aria-invalid={fieldState.invalid}
              onValueChange={(value) => field.onChange(value)}
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
                {options?.map((el, i) => (
                  <SelectItem key={i} value={el.value}>
                    <span>{el.label}</span>
                    {el.description ? (
                      <span className="opacity-60 text-xs">
                        {el.description}
                      </span>
                    ) : null}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
          {fieldState.error && (
            <FieldError>{fieldState.error.message}</FieldError>
          )}
        </Field>
      )}
    />
  );
}
