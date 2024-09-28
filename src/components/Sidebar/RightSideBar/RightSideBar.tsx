import { FC, memo } from 'react';
import styles from './RightSideBar.module.css'

const RightSideBar: FC = memo(() => {
    return (
        <div className={styles.right_side_bar}>
            <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tempora voluptatibus, aspernatur
                numquam exercitationem eos expedita sunt ipsa asperiores minus tempore deleniti similique, unde quia
                ducimus doloremque repudiandae. Doloribus, doloremque!
            </span>
        </div>
    );
});
export default RightSideBar;
