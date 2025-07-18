"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full fixed top-0 z-40 left-3 mt-4.5 active:scale-80">
      <ArrowLeft width={25} height={25} />
      <span className="sr-only">Voltar</span>
    </button>
  );
}