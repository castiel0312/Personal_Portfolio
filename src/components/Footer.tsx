const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-6 text-center">
      <p className="font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Alex Chen. Built with precision.
      </p>
    </footer>
  );
};

export default Footer;
