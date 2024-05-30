import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import { Control } from "react-hook-form";

type Props = {
  control: Control<any>;
  label: string;
  name: string;
  description?: string;
  placeholder?: string;
  type?: string;
  onChange?: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput = ({
  control,
  label,
  name,
  description,
  placeholder = '',
  type = "text",
  onChange,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                type={type}
                {...field}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
  // return (
  //   <FormField
  //     control={control}
  //     name={name}
  //     render={({ field }) => (
  //       <FormItem>
  //         <FormLabel>{label}</FormLabel>
  //         <FormControl>
  //           <Input placeholder={placeholder} type={type} {...field} />
  //         </FormControl>
  //         {description && <FormDescription>{description}</FormDescription>}
  //         <FormMessage />
  //       </FormItem>
  //     )}
  //   />
  // );
};
