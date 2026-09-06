import TopicForm from "@/modules/layouts/author/topic-form";
import { createTopic } from "./actions";

export default function NewTopicPage() {
  return <TopicForm mode="create" action={createTopic} />;
}
