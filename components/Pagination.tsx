import { Button, HStack } from '@chakra-ui/react';
import type { VFC } from 'react';

type Props = {
  totalCount: number;
  pageSize: number;
  onClick: (index: number) => void;
  currentPage: number;
};

const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

export const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  onClick,
}: Props) => {
  return (
    <HStack w='full' justifyContent='center' align='center' py={5}>
      {range(1, Math.ceil(totalCount / pageSize)).map((number, index) => (
        <Button
          as='a'
          key={number}
          onClick={() => onClick(number)}
          bg={currentPage === number ? 'blue.500' : 'blue.100'}
          color={currentPage === number ? 'white' : 'blue.600'}
          _hover={{
            bg: 'blue.300',
            color: 'white',
          }}
          borderRadius='full'
        >
          {number}
        </Button>
      ))}
    </HStack>
  );
};
