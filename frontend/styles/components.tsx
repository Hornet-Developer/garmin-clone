import styled from "styled-components";

export const DropDown = styled.select.attrs<{ className?: string }>(
  (props) => ({
    className: `w-full h-auto bg-white rounded-none font-roboto text-[0.9rem] ${props.className}`,
  })
)<{ className?: string }>`
  border: 1px solid ${(props) => props.theme.colors.grey["300"]};
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  outline: 0;
  padding: 0.8em;
`;

export const Devide = styled.div.attrs({
  className: "w-full px-4",
})`
  margin: 1.5rem 0;
  border-top: 1px solid ${(props) => props.theme.colors.grey["300"]};
`;

const CheckIcon = styled.span.attrs((props) => ({
  ...props,
  className: "inline-block relative",
}))`
  border: 2px solid #000;
  height: 0.7em;
  margin-right: 0.5em;
  vertical-align: middle;
  width: 0.7em;
`;

export const Checkbox = ({ id, label }: { id: string; label: string }) => (
  <div>
    <input id={id} type="checkbox" className="hidden" />
    <label htmlFor={id} className="pl-2 cursor-pointer">
      <CheckIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="absolute bg-black top-0 left-0 hidden"
        >
          <path d="M70.1 35.9L40 64.1 29.9 54"></path>
        </svg>
      </CheckIcon>
      <span>{label}</span>
    </label>
  </div>
);
