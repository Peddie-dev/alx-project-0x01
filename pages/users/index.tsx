import { useState } from "react";
import Header from "@/components/layout/Header";
import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import { UsersPageProps, UserProps, UserData } from "@/interfaces";

const UsersPage = ({ users }: UsersPageProps) => {
  const [userList, setUserList] = useState<UserProps[]>(users);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddUser = (newUser: UserData) => {
    setUserList((prev) => [
      ...prev,
      { ...newUser, id: prev.length + 1 } as UserProps,
    ]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Users</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
          >
            Add User
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {userList.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}

export default UsersPage;
