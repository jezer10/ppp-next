"use client";
import { LoadingComponent } from "@/components/LoadingComponent";
import { useInformation } from "@/lib/hooks/useInformation";
import { useSession } from "next-auth/react";

export default function Default() {
  const { loading, error, user_data } = useInformation();
  if (loading) return <div>carganding</div>;
  return <LoadingComponent />;
}
