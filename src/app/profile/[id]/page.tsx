interface PageProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: PageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl">Profile</h1>
      <hr className="w-full my-2 border-t border-gray-300" />
      <p className="text-2xl">
        Profile Page <span className="bg-orange-500 px-2 py-1 rounded">{params.id}</span>
      </p>
    </div>
  );
}








