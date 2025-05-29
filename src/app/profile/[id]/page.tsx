interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: PageParams) {
  const resolvedParams = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl">Profile</h1>
      <hr />
      <p className="text-2xl">
        Profile Page <span className="bg-orange-500">{resolvedParams.id}</span>
      </p>
    </div>
  );
}
