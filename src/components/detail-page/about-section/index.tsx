import Text from "components/common/text";

const AboutSection = () => (
    <section
        title="actions"
        className="flex flex-col gap-5"
    >
        <Text variant="big-heading"> About </Text>
        {/* 4 paragraphs of lorem ipsum in Text component */}

        <Text variant="paragraph">
            Excepteur consectetur sit Lorem veniam laboris. Sint culpa cupidatat in velit et anim. Eu in amet excepteur minim mollit nostrud est do ad tempor.
        </Text>

        <Text variant="paragraph">
            Excepteur consectetur sit Lorem veniam laboris. Sint culpa cupidatat in velit et anim. Eu in amet excepteur minim mollit nostrud est do ad tempor.
        </Text>

        <Text variant="paragraph">
            Excepteur consectetur sit Lorem veniam laboris. Sint culpa cupidatat in velit et anim. Eu in amet excepteur minim mollit nostrud est do ad tempor.
        </Text>

        <Text variant="paragraph">
            Excepteur consectetur sit Lorem veniam laboris. Sint culpa cupidatat in velit et anim. Eu in amet excepteur minim mollit nostrud est do ad tempor.
        </Text>
    </section>
);

export default AboutSection;
