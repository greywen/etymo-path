'use client';
import { useRef } from 'react';

export default function Home() {
  const formRef = useRef<HTMLFormElement | null>(
    null
  ) as React.RefObject<HTMLFormElement>;
  const onSubmit = () => {
    console.log(formRef.current);
  };

  return (
    <h1>
      <form ref={formRef} name='form' onSubmit={onSubmit}>
        <input name='value' type='text' />
        <button type='submit' />
      </form>
    </h1>
  );
}
