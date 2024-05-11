import { Tables } from "@/types/supabase";
import { Text, Card, CardBody, Heading, Stack, Badge, CardFooter, Button } from "@chakra-ui/react";
import { cancelRequest } from "./cancelRequest";

export function RequestCard({ item }: { item: Tables<'requests'> & { response4request: Tables<"response4request">[] } }) {
    return (
        <Card
            direction={{ base: 'row' }}
            size="sm"
            overflow='hidden'
            variant="outline"
        >
            <Stack style={{ flex: 1 }}>
                <CardBody>
                    <Heading size='md' className="flex items-center justify-between">
                        {item.name}
                        {item.response4request[0]?.reject === true && <Badge colorScheme='red'>REJECTED</Badge>}
                        {item.response4request[0]?.reject === false && <Badge colorScheme='green'>APPROVED</Badge>}
                        {!item.response4request[0] && <Badge colorScheme='orange'>PENDING</Badge>}
                    </Heading>

                    <Text py='2'>
                        {item.response4request[0]?.message}
                    </Text>
                </CardBody>

                <CardFooter>
                    <form className="ml-auto" action={cancelRequest}>
                        <input type="hidden" value={item.id} name="id" />
                        <Button variant='ghost' type="submit">
                            キャンセル
                        </Button>
                    </form>
                </CardFooter>
            </Stack>
        </Card>
    );
}