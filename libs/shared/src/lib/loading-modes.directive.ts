import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AlertComponent } from '@ht/core-ui';

@Directive({
  selector: '[htSharedLoadingModes]',
})
export class LoadingModesDirective implements OnChanges {
  @Input('htSharedLoadingModes') modes: LoadingModes | null = null;

  @Input('htSharedLoadingModesLoading') loading: TemplateRef<unknown> | string =
    'Your Data Is Loading';
  @Input('htSharedLoadingModesErrored') errored: TemplateRef<unknown> | string =
    'Sorry There was an Error Loading Your Data';
  @Input('htSharedLoadingModesEmpty') empty: TemplateRef<unknown> | string =
    'There is no data';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<unknown>,
  ) {}
  ngOnChanges(): void {
    // back on solid ground
    this.viewContainerRef.clear();
    if (this.modes?.errored) {
      if (typeof this.errored !== 'string') {
        this.viewContainerRef.createEmbeddedView(this.errored);
      } else {
        const c = this.viewContainerRef.createComponent(AlertComponent);
        c.instance.alertStyle = 'error';
        c.instance.message = this.errored;
        return;
      }
    }
    if (this.modes?.loading) {
      if (typeof this.loading !== 'string') {
        this.viewContainerRef.createEmbeddedView(this.loading);
      } else {
        const c = this.viewContainerRef.createComponent(AlertComponent);
        c.instance.alertStyle = 'warning';
        c.instance.message = this.loading;
        return;
      }
    }
    if (this.modes?.empty) {
      if (typeof this.empty !== 'string') {
        this.viewContainerRef.createEmbeddedView(this.empty);
      } else {
        const c = this.viewContainerRef.createComponent(AlertComponent);
        c.instance.alertStyle = 'error';
        c.instance.message = this.empty;
        return;
      }
    }

    // the default - just show the "happy path"
    this.viewContainerRef.createEmbeddedView(this.template);
  }
}

export type LoadingModes = {
  loading: boolean;
  errored: boolean;
  empty: boolean;
};
