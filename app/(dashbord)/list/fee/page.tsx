 
import FeeAdmin from '@/components/custom/FeeAdmin';
import FeePage from '@/components/custom/FeePage';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

const PaymentButton: React.FC = async () => {
  const user = await currentUser();

  if (!user) {
    return <div>Error: User not found</div>;
  }

  const { role } = user.publicMetadata;

  if (role === 'admin') {
    return <FeeAdmin />;
  }

  const student = await prisma.student.findUnique({
    where: { username: user.username! },
    select: { id: true, batch: true, phone: true },
  });

  if (!student) {
    return <div>Error: Student not found</div>;
  }

  return (
    <div>
      <FeePage userId={student.id} batch={student.batch} phone={student.phone} />
    </div>
  );
};

export default PaymentButton;
