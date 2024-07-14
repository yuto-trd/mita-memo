import type { Tables } from '@/types/supabase';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

export function RequestCard({
  item,
}: {
  item: Tables<'requests'> & { response4request: Tables<'response4request'>[] };
}) {
  return (
    <Card
      direction={{ base: 'row' }}
      size='sm'
      overflow='hidden'
      variant='outline'
    >
      <Stack style={{ flex: 1 }}>
        <CardBody>
          <Heading size='md' className='flex items-center justify-between'>
            {item.name}
            {item.response4request[0]?.reject === true && (
              <Badge colorScheme='red'>REJECTED</Badge>
            )}
            {item.response4request[0]?.reject === false && (
              <Badge colorScheme='green'>APPROVED</Badge>
            )}
            {!item.response4request[0] && (
              <Badge colorScheme='orange'>PENDING</Badge>
            )}
          </Heading>

          <Text py='2'>{item.response4request[0]?.message}</Text>
        </CardBody>

        <CardFooter>
          <Button
            variant='ghost'
            as={Link}
            href={`/moderator/requests/${item.id}`}
          >
            編集
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}
