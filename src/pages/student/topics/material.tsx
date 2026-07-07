import styled from 'styled-components';
import { theoreticalMaterialMock } from '../../../assets/shared/data/theoreticalMaterialMock';
import { MarkdownRenderer } from '../../../components/markdown-renderer';
import AppLayout from '../../../components/widgets/app/layout';
import { BasicBlock } from '../../../components/blocks';
import { COLORS } from '../../../assets/styles/colors';
import { CardTitle } from '../../../assets/styles/typography';

import { topicDetailsMock } from '../../../assets/shared/data/topic';
import { LinkTitle } from '../../../components/title-section';

export default function MaterialDetailsTopicPage() {
  //   const { id } = useSearchParams();

  return (
    <AppLayout>
      <LinkTitle firstTitle={topicDetailsMock.title[0]} secondTitle={topicDetailsMock.title[1]} />
      <MaterialBlock $bgColor={COLORS.lighterBg}>
        <CardTitle>Теоретичний матеріал</CardTitle>
        <MarkdownRenderer content={theoreticalMaterialMock} />
      </MaterialBlock>
    </AppLayout>
  );
}

const MaterialBlock = styled(BasicBlock)`
  border-radius: 24px;
  padding: 24px;
  max-height: 90vh;
  overflow-y: auto;

  ${CardTitle} {
    color: ${COLORS.accent};
  }
`;
