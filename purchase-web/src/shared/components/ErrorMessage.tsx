interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p role="alert" className="rounded-md bg-red-50 p-2 text-sm text-red-800">
      {message}
    </p>
  );
}