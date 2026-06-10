import { useState } from 'react';
import { TOPICS } from './curriculum-tree';

export const MobileTopicTree = () => {
  const [opened, setOpened] = useState<number | null>(2);

  return (
    <div>
      {TOPICS.map((topic) => (
        <div key={topic.id}>
          <div onClick={() => setOpened(opened === topic.id ? null : topic.id)}>
            {topic.label.join(' ')}

            {topic.done && ' ✓'}
          </div>

          {opened === topic.id && (
            <div>
              {topic.subtopics.map((sub) => (
                <div key={sub}>• {sub}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
