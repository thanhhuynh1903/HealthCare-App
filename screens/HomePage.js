import { View, Text } from "react-native";
import React from "react";
import useApiStore from "../util/zustandfetchAPI";
export default function HomePage() {
  const { data, isLoading, error, fetchData } = useApiStore();
  useEffect(() => {
    fetchData("/example-path");
  }, []);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return <View>{data && <Text>{JSON.stringify(data, null, 2)}</Text>}</View>;
}
