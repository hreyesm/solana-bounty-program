import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from '../style/hero.module.css';
import Text from 'components/common/text';

function Headline() {
    return (
        <>
            <div className="align-center flex w-full justify-evenly gap-4 text-center md:hidden">
                <Carousel
                    showArrows={false}
                    showStatus={false}
                    infiniteLoop={true}
                    className={'w-full ' + styles.carousel}
                >
                    <div className="mb-16">
                        <Text
                            variant="heading"
                            className="w-full pb-6  text-white"
                        >
                            Headline
                        </Text>
                        <Text variant="paragraph" className="w-full">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ad sed adipiscing volutpat tincidunt amet
                            vulputate porta est.
                        </Text>
                    </div>
                    <div className="mb-16">
                        <Text
                            variant="heading"
                            className="w-full pb-6  text-white"
                        >
                            Headline
                        </Text>
                        <Text variant="paragraph" className="w-full">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ad sed adipiscing volutpat tincidunt amet
                            vulputate porta est.
                        </Text>
                    </div>
                    <div className="mb-16">
                        <Text
                            variant="heading"
                            className="w-full pb-6  text-white"
                        >
                            Headline
                        </Text>
                        <Text variant="paragraph" className="w-full">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ad sed adipiscing volutpat tincidunt amet
                            vulputate porta est.
                        </Text>
                    </div>
                </Carousel>
            </div>
            <div className="align-center hidden justify-evenly gap-4 text-left md:flex">
                <div>
                    <Text variant="heading" className="w-full pb-6  text-white">
                        Headline
                    </Text>
                    <Text variant="paragraph" className="w-full">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ad sed adipiscing volutpat tincidunt amet vulputate
                        porta est.
                    </Text>
                </div>
                <div>
                    <Text variant="heading" className="w-full pb-6  text-white">
                        Headline
                    </Text>
                    <Text variant="paragraph" className="w-full">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ad sed adipiscing volutpat tincidunt amet vulputate
                        porta est.
                    </Text>
                </div>
                <div>
                    <Text variant="heading" className="w-full pb-6  text-white">
                        Headline
                    </Text>
                    <Text variant="paragraph" className="w-full">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ad sed adipiscing volutpat tincidunt amet vulputate
                        porta est.
                    </Text>
                </div>
            </div>
        </>
    );
}

export default Headline;
