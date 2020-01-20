export default ({ to, label, children }) => <Link to={to} style={s.borders([0, 0, 1], '#f0f0f0')}>
  {label ? <Write padding={20} red1>{label}</Write> : children}
</Link>
