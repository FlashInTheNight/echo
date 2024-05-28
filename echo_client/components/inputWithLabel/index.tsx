import { type Control, useController } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<any>;
  required?: string;
  endContent?: JSX.Element;
};

export function InputWithLabel({
  name,
  label,
  placeholder,
  type,
  control,
  required = "",
  endContent,
}: Props) {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        // invalid={invalid}
        // errorMessage={`${errors[name]?.message ?? ""}`}
        // endContent={endContent}
      />
    </div>
  );
}
