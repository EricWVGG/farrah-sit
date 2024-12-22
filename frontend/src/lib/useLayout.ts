import { create, StateCreator } from 'zustand'

type ModalType = 'CONTACT' | 'INDEX' | 'NAV' | 'ABOUT' | 'SPECS'

interface LayoutState {
  subject?: string
  setSubject: (s?: string) => void

  activeModal?: ModalType
  setActiveModal: (t?: ModalType) => void

  transitioning: boolean
  setTransitioning: (b: boolean) => void

  specsActive: boolean
  setSpecsActive: (a?: boolean) => void

  toggle: (m: ModalType) => void
}

const createNavState: StateCreator<LayoutState> = (set) => ({
  setSubject: (subject) => set({ subject }),

  activeModal: undefined,
  setActiveModal: (activeModal) => set({ activeModal }),

  transitioning: true,
  setTransitioning: (transitioning: boolean) =>
    set({ transitioning, specsActive: false }),

  specsActive: false,
  setSpecsActive: (specsActive) => set({ specsActive }),

  toggle: (modal) =>
    set((state) => ({
      activeModal: state.activeModal === modal ? undefined : modal,
    })),
})

export default create<LayoutState>(createNavState)
