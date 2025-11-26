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
        render={({ field, fieldState: { error } }) => (
          <>
            {variant === 'text' ? <Input type="text" {...field} /> : null}
            {variant === 'number' ? (
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            ) : null}
            {variant === 'select' && options ? (
              <Select
                onValueChange={(value) => field.onChange(value)} // or convert value as needed
                value={String(field.value)}
              >
                <SelectTrigger
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
            {/* {variant === 'select' && options ? (
              <SelectComponent options={options} {...field} />
            ) : null} */}
            {error && <FieldError>{error.message}</FieldError>}
          </>
        )}
      />
    </Field>
  );
}
