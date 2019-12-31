export default function useDebug(enabled) {
  return enabled ? console.log : () => { };
}
