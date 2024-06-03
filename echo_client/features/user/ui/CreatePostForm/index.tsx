"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form"
import { Textarea } from "@/components/textarea";
import { useCreatePostMutation, useLazyGetAllPostsQuery } from "@/lib/servicies/postsApi"

const FormSchema = z.object({
  post: z
    .string()
    .min(1, {
      message: "Пост не должен быть пустым.",
    })
    .max(120, {
      message: "Пост не должен быть длинее 120 символов.",
    }),
})

export function CreatePostForm() {
  const [createPost] = useCreatePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await createPost({content: data.post }).unwrap()
      form.setValue('post', '')
      await triggerGetAllPosts().unwrap()
    } catch(error) {
      console.log('create post error', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Расскажите немного о себе"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">Submit</Button>
      </form>
    </Form>
  )
}
