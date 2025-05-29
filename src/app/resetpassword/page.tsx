
import React, { Suspense } from "react";
import ResetPasswordPage from "../../components/ResetPasswordPage";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
