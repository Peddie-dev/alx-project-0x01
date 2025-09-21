import { UserProps } from "@/interfaces";

const UserCard: React.FC<UserProps> = ({ id, name, username, email }) => {
  return (
    <div className="max-w-xl mx-auto my-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{id}</h2>
      </div>
      <p className="text-gray-600">{name}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>User ID: {username}</span>
        <span>Post ID: {id}</span>
      </div>
    </div>
  );
};

export default UserCard;