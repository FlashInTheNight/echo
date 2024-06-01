import { useCreateCommentMutation } from "@/lib/servicies/commentsApi";
import { useLazyGetPostByIdQuery } from "@/lib/servicies/postsApi";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form"
import { Textarea } from "@/components/textarea"
import { useParams } from "next/navigation";

export function CreateComment() {
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();

  const params = useParams<{ id: string }>()

  const form = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (params?.id) {
        await createComment({ content: data.comment, postId: params.id }).unwrap()
        await getPostById(params.id).unwrap()
        form.setValue("comment", "")
      }
    } catch (error) {
      console.log("err", error)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="comment"
          defaultValue=""
          rules={{
            required: "Поле обязательно",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Написать комментарий</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Напишите свой ответ"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
