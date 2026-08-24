import styles from './modal.module.scss';

export interface ModalProps {
  content: string;
  confirmButtonText: string;
  exitButtonText: string;
  handleConfirm: () => void;
  handleExit: () => void;
}

export default function Modal({
  content,
  confirmButtonText,
  exitButtonText,
  handleConfirm,
  handleExit
}: ModalProps) {
  return (
    <>
      <div role="dialog" aria-labelledby="dialog-title" className={styles.modal}>
        <h3 id="dialog-title" className={styles.dialogTitle}>
          {content}
        </h3>
        <div className={styles.modalButtons}>
          <button
            onClick={() => {
              handleConfirm();
            }}
          >
            {confirmButtonText}
          </button>
          <button
            onClick={() => {
              handleExit();
            }}
          >
            {exitButtonText}
          </button>
        </div>
      </div>
      <div className={styles.modalOverlay}></div>
    </>
  );
}
