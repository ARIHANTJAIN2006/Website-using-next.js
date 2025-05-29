interface UserProfileProps {
  params: {
    id: string;
  };
}

export default async function UserProfile({ params }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl">Profile</h1>
      <hr />
      <p className="text-2xl">
        Profile Page <span className="bg-orange-500">{params.id}</span>
      </p>
    </div>
  );
}







