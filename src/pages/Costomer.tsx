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



  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

const {data}=useAllUsersQuery( user?._id! || "")

const [deleteHandler]=useDeleteUserMutation()


const handleDelete=async(id :string)=>{
  const res = await deleteHandler({userId:id!,adminUserId:user?._id!})

  if('data' in res){
    alert(res?.data?.message)
  }else{
    alert(res?.error)
  }
}

  // Format date to readable string
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get initials from name for avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Users Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.users?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.photo} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{user.gender}</TableCell>
                  <TableCell>{formatDate(user.dob)}</TableCell>
                  <TableCell><Button variant={'ghost'} onClick={()=>handleDelete(user._id!)}>Delete</Button></TableCell>
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