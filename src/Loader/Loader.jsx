import loaderStyles from './loader.module.css'

export function Loader() {
  return (
    <div className="d-flex justify-content-center">
      <div className={loaderStyles['lds-spinner']}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
