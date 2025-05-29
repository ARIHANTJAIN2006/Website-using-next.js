interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: PageParams) {
  const resolvedParams = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl">Profile</h1>
      <hr />
      <p className="text-3xl font-bold text-white mb-4">
  Profile Page{" "}
  <span className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black px-3 py-1 rounded-md shadow-md">
    {resolvedParams.id}
  </span>
</p>
    </div>
  );
}
