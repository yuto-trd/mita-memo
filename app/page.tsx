import { FaArrowRightToBracket } from "react-icons/fa6";
import { Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div>
            <div className="relative" style={{ height: "500px" }}>
                <img src="/grainy-gradient.svg" className="w-full object-cover absolute mix-blend-color-burn" style={{ height: "500px" }} />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Heading as='h1' color="#082432" size='3xl'>Mita-memo</Heading>
                    <Text className="mt-3 text-center" fontSize='2xl'>見た作品を記録しよう</Text>

                    <div className="flex flex-row gap-4">
                        <Button
                            as={Link}
                            href={user === null ? "/login" : "/list"}
                            className="mt-8"
                            size="lg"
                            rightIcon={<FaArrowRightToBracket />}
                            colorScheme="blue">
                            サインイン
                        </Button>

                        <Button
                            as={Link}
                            href="/list"
                            className="mt-8"
                            size="lg">
                            リストに移動
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
