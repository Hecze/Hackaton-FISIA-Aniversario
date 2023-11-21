
import "./Navbar.css";
import Link from "next/link";

function Navbar () {

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <div className="logo" id="fisi">
        <img src="/fisi.png" alt="" />
        <h2>FISI ANIVERSARIO</h2>
        </div>
        <li className="nav-item"><Link href="/"></Link></li>
        <li className="nav-item"><Link href="/"></Link></li>
        <li className="nav-item"><Link href="https://mrsquatch.github.io/Reserva-de-Espacio-FISI/"></Link></li>
        <div className="logo" id="unmsm">
        <img src="/unmsm.png" />
        </div>

      </ul>
    </nav>
  );
}

export default Navbar;
