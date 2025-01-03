import { create, StateCreator } from 'zustand'

type ModalType = 'CONTACT' | 'INDEX' | 'NAV' | 'ABOUT' | 'SPECS'

interface LayoutState {
  subject?: string
  setSubject: (s?: string) => void

  activeModal?: ModalType
  setActiveModal: (t?: ModalType) => void

  transitioning: boolean
  setTransitioning: (b: boolean) => void

  toggle: (m: ModalType) => void
}

const createNavState: StateCreator<LayoutState> = (set) => ({
  setSubject: (subject) => set({ subject }),

  activeModal: undefined,
  setActiveModal: (activeModal) => set({ activeModal }),

  transitioning: true,
  setTransitioning: (transitioning: boolean) => set({ transitioning }),

  toggle: (modal) =>
    set((state) => ({
      activeModal: !!state.activeModal ? undefined : modal,
    })),
})

export default create<LayoutState>(createNavState)
