import React, { forwardRef, useImperativeHandle, useRef } from "react";
import {
  ButtonGroup,
  CloseButton,
  ModalContainer,
  ModalHeader,
  ModalOverlay,
} from "./style";
import Botao from "../Botao";

interface ModalProps {
  icon: React.ReactNode;
  titulo: string;
  children: React.ReactNode;
  estaAberta: boolean;
  aoClicar: () => void;
  cliqueForaModal: boolean;
}

export interface ModalHandle {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>(({
  icon,
  titulo,
  children,
  aoClicar,
  cliqueForaModal = true
}, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const fecharModal = () => {
    dialogRef.current?.close();
  };

  const aoClicarForaModal = (evento: React.MouseEvent<HTMLDialogElement>) => {
    if (cliqueForaModal && evento.target === dialogRef.current){
      fecharModal();
    }

  }

  useImperativeHandle(ref, () => (
    {
      open: () => dialogRef.current?.showModal(),
      close: fecharModal
    }
  ))

  return (
    <ModalOverlay>
      <ModalContainer ref={dialogRef} onClick={aoClicarForaModal}>
        <ModalHeader>
          <div>
            {icon}
            {titulo}
          </div>
          <CloseButton onClick={fecharModal}>x</CloseButton>
        </ModalHeader>
        {children}
        <ButtonGroup>
          <Botao $variante="secundario" onCanPlay={fecharModal}>
            Cancelar
          </Botao>
          <Botao $variante="primario" onClick={() =>{
            aoClicar();
            fecharModal();
          }}>
            Adicionar
          </Botao>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
});

export default Modal;
