import { useRecoilState } from 'recoil';
import { atoms } from '../store';

function useModal(type) {
  const [modal, setModal] = useRecoilState(atoms.modal);
  const openModal = () => setModal({ ...modal, [type]: true });
  const closeModal = () => setModal({ ...modal, [type]: false });
  return [openModal, closeModal];
}

export { useModal };
