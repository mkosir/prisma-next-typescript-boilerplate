import { Prisma } from '@prisma/client';

import { Table } from 'common/components';
import { ServerSidePropsUser } from 'pages/users/[id]';

export const UserPage = ({ userId, user }: ServerSidePropsUser) => {
  if (user === null) {
    return (
      <div>
        User with id <span style={{ fontStyle: 'italic', color: 'gray' }}>{userId}</span> does not exist.
      </div>
    );
  }

  return (
    <div>
      <h3>👤 User - {user.name}</h3>
      <Table
        trHead={Object.keys(Prisma.UserScalarFieldEnum).map((columnName) => (
          <th key={columnName}>{columnName}</th>
        ))}
        trData={[
          <>
            <td>{user.id}</td>
            <td>{new Date(user.createdAt).toDateString()}</td>
            <td>{new Date(user.updatedAt).toDateString()}</td>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '170px' }}>
              {user.imageUrl}
            </td>
            <td>{user.role}</td>
          </>,
        ]}
      />
      <h4>Batches Cooked</h4>
      <Table
        trHead={Object.keys(Prisma.BatchScalarFieldEnum).map((columnName) => (
          <th key={columnName}>{columnName}</th>
        ))}
        trData={user.batches.map((batch) => (
          <>
            <td>{batch.id}</td>
            <td>{new Date(batch.createdAt).toDateString()}</td>
            <td>{new Date(batch.updatedAt).toDateString()}</td>
            <td>{batch.title}</td>
            <td>{batch.description ?? '-'}</td>
            <td>{new Prisma.Decimal(batch.purity).toNumber()}</td>
            <td>{new Prisma.Decimal(batch.weight).toNumber()}</td>
            <td>{batch.supplierId}</td>
          </>
        ))}
      />
    </div>
  );
};
