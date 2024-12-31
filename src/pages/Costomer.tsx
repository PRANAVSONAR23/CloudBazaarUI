import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '@/types/reducer-types';
import { useAllUsersQuery, useDeleteUserMutation } from '@/redux/api/userAPI';
import { Button } from '@/components/ui/button';

const UsersPage: React.FC = () => {
  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);

  const { data } = useAllUsersQuery(user?._id! || "");
  const [deleteHandler] = useDeleteUserMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteHandler({ userId: id!, adminUserId: user?._id! });

    if ('data' in res) {
      alert(res?.data?.message);
    } else {
      alert(res?.error);
    }
  };

  // Format date to readable string
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get initials from name for avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <Card className="shadow-xl bg-gray-800 rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-white">Users Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="text-white">
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-lg">User</TableHead>
                <TableHead className="font-semibold text-lg">Email</TableHead>
                <TableHead className="font-semibold text-lg">Role</TableHead>
                <TableHead className="font-semibold text-lg">Gender</TableHead>
                <TableHead className="font-semibold text-lg">Date of Birth</TableHead>
                <TableHead className="font-semibold text-lg">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.users?.map((user) => (
                <TableRow key={user._id} className="hover:bg-blue-700 cursor-pointer transition-all duration-200">
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.photo} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-lg">{user.name}</span>
                  </TableCell>
                  <TableCell className="text-lg">{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      
                      className={`text-xs py-1 px-3 rounded-2xl font-semibold ${user.role==='admin'?'bg-green-600':'bg-yellow-500'} `}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize text-lg">{user.gender}</TableCell>
                  <TableCell className="text-lg">{formatDate(user.dob)}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-800 text-white font-semibold rounded-md py-2 px-4"
                      onClick={() => handleDelete(user._id!)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
