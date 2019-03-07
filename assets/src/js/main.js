/**
 * Main javascript entrypoint
 *
 * @since 9.0.0
 */

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

library.add(faGithub, faInstagram, faLinkedinIn, faEnvelope);
dom.watch();

window.onload = () => {
	document.body.classList.remove('preload');
}

