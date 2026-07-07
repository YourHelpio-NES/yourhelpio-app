import styled from 'styled-components';
import { formatFileSize, getFileIcon } from './functionality';
import { ALLOWED_HINT, type UploadFile } from './upload.type';
import { useRef, useState } from 'react';
import { useFileUpload } from '../../assets/shared/hooks/useUploadFIle';
import { SmallText, TextBody } from '../../assets/styles/typography';
import { COLORS } from '../../assets/styles/colors';
import { FileUploadIcon } from '../../assets/images/icons/file-upload-icon';
import pdfIcon from '../../assets/images/icons/pdf-file.png';
import docsIcon from '../../assets/images/icons/docs-file.png';
import attachIcon from '../../assets/images/icons/attach-icon.png';
import imageIcon from '../../assets/images/icons/image-icon.png';
import linkIcon from '../../assets/images/icons/link-icon.png';
import { DoneIcon } from '../../assets/images/icons/done-icon';
import { Button } from '../button';
import { CloseIcon } from '../../assets/images/icons/close-icon';
import { BREAKPOINTS, media } from '../../assets/styles/breakpoints';

const Card = styled.div`
  border: 0.5px solid rgba(0, 0, 0, 0.12);
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
  ${media(BREAKPOINTS.sm)} {
    width: 100%;
  }
`;

const Dropzone = styled.div<{ $dragging: boolean }>`
  background: ${({ $dragging }) =>
    $dragging ? 'rgba(127, 140, 230, 0.2)' : 'rgba(127, 140, 230, 0.07)'};
  border: ${({ $dragging }) =>
    $dragging ? `1.5px dashed ${COLORS.accent}` : `1.5px dashed transparent`};
  border-radius: var(--border-radius-lg, 10px);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
  align-items: center;
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s;

  ${media(BREAKPOINTS.sm)} {
    width: 100%;
  }
`;

const Accent = styled.span`
  color: ${COLORS.accent};
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  ${TextBody.componentStyle.rules.join('')};
  color: ${COLORS.accent};

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: ${COLORS.secondary};
  }
`;

const LinkRow = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 24px;
  overflow: hidden;
  transition: border-color 0.15s;

  &:focus-within {
    border-color: rgba(0, 0, 0, 0.4);
  }
`;

const LinkInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px 16px;
  padding-right: 8px;
  font-size: 13px;
  outline: none;
  background: transparent;
  color: ${COLORS.text};
  ${TextBody.componentStyle.rules.join('')};

  &::placeholder {
    color: rgba(0, 0, 0, 0.35);
  }
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
`;

const FileItem = styled.div`
  background: ${COLORS.background};
  border-radius: 10px;
  padding: 10px 12px;
`;

const FileTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const FileIconWrap = styled.img<{ $type: string }>`
  width: 36px;
  height: 36px;
  padding: 6px;
  border-radius: 8px;
  background: ${COLORS.lighterBg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  color: ${({ $type }) =>
    $type === 'pdf' ? '#D4537E' : $type === 'docs' ? COLORS.status.info : 'rgba(0,0,0,0.4)'};
`;

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProgressTrack = styled.div`
  height: 3px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  background: ${COLORS.accent};
  border-radius: 2px;
  width: ${({ $pct }) => $pct}%;
  transition: width 0.3s ease;
`;

const FileRow = ({ f, onRemove }: { f: UploadFile; onRemove: () => void }) => {
  const icon = getFileIcon(f.file);

  return (
    <FileItem>
      <FileTop>
        <FileIconWrap
          $type={icon}
          src={
            icon === 'pdf'
              ? pdfIcon
              : icon === 'docs'
                ? docsIcon
                : icon === 'image'
                  ? imageIcon
                  : icon === 'link'
                    ? linkIcon
                    : attachIcon
          }
        />
        <FileInfo>
          <SmallText $medium>
            {f.file.name}
            {f.status === 'done' && <DoneIcon size={22} />}
          </SmallText>
          <SmallText $color={COLORS.placeholder}>{formatFileSize(f.file.size)}</SmallText>
        </FileInfo>
        {f.status === 'uploading' && <SmallText>{f.progress}%</SmallText>}

        <Button
          $bgColor={'transparent'}
          $brColor={COLORS.placeholder}
          width="auto"
          $brRadius={'8'}
          $iconSize={20}
          type={'small'}
          className="p-0"
          onClick={onRemove}
        >
          <CloseIcon color={COLORS.placeholder} size={16} />
        </Button>
      </FileTop>
      {f.status === 'uploading' && (
        <ProgressTrack>
          <ProgressFill $pct={f.progress} />
        </ProgressTrack>
      )}
    </FileItem>
  );
};

export const FileUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const { files, dropError, addFiles, removeFile, linkValue, setLinkValue, linkError, submitLink } =
    useFileUpload();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = '';
  };

  return (
    <Card>
      <TextBody $medium>Завантаження файлів</TextBody>

      <Dropzone
        $dragging={dragging}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        role="button"
        aria-label="Зона перетягування файлів"
      >
        {/* іконка upload — заміни на свою */}
        <FileUploadIcon />
        <TextBody className="text-center" $label>
          Перетягніть файли або <Accent>оберіть</Accent> для завантаження
        </TextBody>
        <SmallText $color={COLORS.secondary}>{ALLOWED_HINT} • до 20MB</SmallText>
      </Dropzone>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />

      {dropError && <SmallText $color={COLORS.status.error}>{dropError}</SmallText>}

      {files.length > 0 && (
        <FileList>
          {files.map((f) => (
            <FileRow key={f.id} f={f} onRemove={() => removeFile(f.id)} />
          ))}
        </FileList>
      )}

      <OrDivider>або</OrDivider>

      <TextBody>Імпорт за посиланням</TextBody>
      <LinkRow>
        <LinkInput
          type="url"
          placeholder="Додати посилання файлу"
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submitLink()}
        />
        <Button
          $bgColor={linkValue ? COLORS.boxShadow : COLORS.lighterBg}
          $brColor={linkValue ? COLORS.boxShadow : COLORS.lighterBg}
          $txtColor={linkValue ? COLORS.primary : COLORS.secondary}
          //   disabled={!!linkValue}
          onClick={submitLink}
          className="px-2 py-1 me-1"
        >
          Завантажити
        </Button>
      </LinkRow>
      {linkError && <SmallText $color={COLORS.status.error}>{linkError}</SmallText>}
    </Card>
  );
};
