import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <LoaderCircle className='animate-spin w-24 h-24' color="#090606" strokeWidth={2.5} />
    </div>
  );
}
